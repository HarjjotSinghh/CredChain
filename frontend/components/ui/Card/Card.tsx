import { ReactNode } from "react";

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
    return (
        <div className="w-full max-w-sm m-auto my-8 rounded-lg border-2 border-primary/10 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-2xl shadow-primary/10 hover:shadow-primary/20">
            <div className="md:p-8 p-6">
                {/* <h3 className="mb-1 text-2xl font-medium text-center w-full">{title}</h3> */}
                <p className="300">{description}</p>
                {children}
            </div>
            {footer && (
                <div className="p-4 border-t rounded-b-md border-primary 900 500 mx-auto">
                    {footer}
                </div>
            )}
        </div>
    );
}
