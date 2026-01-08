import { FiChevronRight } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface ActionCardProps {
    title: string;
    icon: IconType;
    description: string;
    colorClass: string;
    onClick?: () => void;
}

const ActionCard = ({ title, icon: Icon, description, colorClass, onClick }: ActionCardProps) => (
    <button
        onClick={onClick}
        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 group transition-all flex items-start gap-4"
    >
        <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-sm">{title}</span>
                <FiChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
    </button>
);

export default ActionCard;