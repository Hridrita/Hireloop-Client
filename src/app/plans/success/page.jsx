import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createSubscription } from '@/lib/actions/subscriptions';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    //update the user table about the new plan
    const subsInfo = {
        email: customerEmail,
        planId: metadata.planId
    }

    const result = await createSubscription(subsInfo)
    
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-blue-500" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Payment Successful!</h1>
          
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            We appreciate your business! A confirmation email has been sent to{' '}
            <span className="text-white font-medium">{customerEmail}</span>. 
            If you have any questions, please contact our support team.
          </p>

          <div className="space-y-3">
            <Link 
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
            
            <a 
              href="mailto:support@hireloop.com"
              className="block text-sm text-zinc-500 hover:text-zinc-300 transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }
}