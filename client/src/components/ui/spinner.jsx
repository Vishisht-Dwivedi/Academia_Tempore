import { Loader } from "lucide-react";
export const Spinner = () => (
    <div className="flex justify-center items-center w-full h-full py-10">
        <Loader className="animate-spin w-8 h-8 text-indigo-500" />
    </div>
);