import { plans } from "../../utils/plans";

type Props = {
  onClick: (value: string) => void;
  className?: string;
}

export function Plans({
  onClick,
  className,
}: Props) {

  return (
    <div className="flex flex-col pb-16 min-h-25 bg-white">
      <span className="flex text-3xl font-black text-black tracking-tight justify-center pb-10">
        Planos
      </span>
      <div className={className ?? "flex flex-row w-full justify-around px-50 max-w-7xl mx-auto"}>
        {plans.map((plan) => (
          <div key={plan.name} className="flex flex-col rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl bg-white w-50 items-center p-6 transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-bold text-neutral-500 mb-1">{plan.name}</span>
            <span className="text-3xl font-black text-neutral-900 mb-6">{`R$ ${plan.price}`}</span>
            <button onClick={() => onClick(plan.type)} className="bg-neutral-900 hover:bg-neutral-800 active:bg-black p-2.5 rounded-xl w-[90%] font-semibold text-sm text-white transition-colors cursor-pointer shadow-sm">
              Assinar
            </button>
          </div>
        ))}            

      </div>
    </div>
  )
}
