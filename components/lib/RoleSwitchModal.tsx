
import { BiShield } from "react-icons/bi";

interface RoleSwitchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;  
    targetRole: string;
}

export default function RoleSwitchModal({ isOpen, onClose, onConfirm, targetRole }: RoleSwitchModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="bg-brand-green/10 p-3 rounded-full mb-4 mx-auto w-fit">
                    <BiShield className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold text-center text-[#111811] mb-2">Switch Perspective?</h3>
                <p className="text-gray-500 text-center text-sm mb-8">
                    You are accessing a landlord area. Would you like to switch your active role to <span className="font-bold text-brand-green capitalize">{targetRole}</span>?
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="h-12 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="h-12 rounded-xl font-bold text-white bg-brand-green hover:bg-brand-green-hover transition-all shadow-md shadow-green-900/20"
                    >
                        Switch Now
                    </button>
                </div>
            </div>
        </div>
    );
}
