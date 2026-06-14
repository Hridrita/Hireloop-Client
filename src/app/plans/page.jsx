"use client";
import { useState } from "react";
import { Check, ChevronDown, Briefcase, Users } from "lucide-react";

const seekerPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Get started and explore what's out there.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    cta: "Current plan",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For active job seekers ready to move.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Maximum visibility, zero limits.",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    cta: "Go Premium",
    highlight: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Great for a company's first year of hiring.",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    cta: "Current plan",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "For teams hiring on a regular basis.",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    cta: "Upgrade to Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/month",
    description: "For high-volume hiring teams.",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription anytime from your account settings. Your plan stays active until the end of the current billing cycle, then your account moves back to the Free plan automatically.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a full refund if you cancel within 7 days of your first payment on a plan. After that, payments are non-refundable, but you'll keep access until your billing period ends.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express). Enterprise customers can also pay via bank transfer — contact sales to set this up.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately and you're charged a prorated amount for the rest of the cycle. Downgrades take effect at the start of your next billing cycle.",
  },
];

const PricingPage = () => {
  const [audience, setAudience] = useState("seeker");
  const [openFaq, setOpenFaq] = useState(null);

  const plans = audience === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-24">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">
            Plans that scale with your hiring
          </h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Whether you're landing your next role or filling your next seat,
            pick a plan that fits where you are right now.
          </p>
        </div>

       
        <div className="flex justify-center mb-14">
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-full p-1 flex w-full max-w-sm">
            <span
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-600 transition-transform duration-300 ease-out ${
                audience === "recruiter" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              onClick={() => setAudience("seeker")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                audience === "seeker" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Briefcase size={16} />
              Job Seekers
            </button>
            <button
              onClick={() => setAudience("recruiter")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                audience === "recruiter" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Users size={16} />
              Recruiters
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col border transition-all ${
                plan.highlight
                  ? "bg-zinc-900 border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,0.4),0_20px_60px_-20px_rgba(37,99,235,0.35)] md:-translate-y-2"
                  : "bg-zinc-900/60 border-zinc-800"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-zinc-500 text-sm mt-1 mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-zinc-500 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span
                      className={`mt-0.5 flex-shrink-0 rounded-full p-0.5 ${
                        plan.highlight ? "bg-blue-600/20 text-blue-400" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <Check size={14} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-zinc-500 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-5 text-sm text-zinc-400 leading-relaxed transition-all duration-200 ${
                    openFaq === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
