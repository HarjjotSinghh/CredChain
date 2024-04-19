import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Input from "./input";
import { InputProps } from "./input";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";

type InputTagsProps = InputProps & {
    value: string[];
    onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
    ({ value, onChange, ...props }, ref) => {
        const [pendingDataPoint, setPendingDataPoint] = useState("");

        const addPendingDataPoint = () => {
            if (pendingDataPoint) {
                const newDataPoints = new Set([...value, pendingDataPoint]);
                onChange(Array.from(newDataPoints));
                setPendingDataPoint("");
            }
        };

        return (
            <>
                <div className="flex">
                    <Input
                        value={pendingDataPoint}
                        onChange={(e) => setPendingDataPoint(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addPendingDataPoint();
                            } else if (
                                e.key === ","
                                // || e.key === " "
                            ) {
                                e.preventDefault();
                                addPendingDataPoint();
                            }
                        }}
                        className="rounded-r-none"
                        {...props}
                        ref={ref}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        className="rounded-l-none border-none py-5 bg-primary/5 hover:bg-primary/10"
                        onClick={addPendingDataPoint}
                    >
                        Add
                    </Button>
                </div>
                <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
                    {value.map((item, idx) => (
                        <Badge
                            key={idx}
                            variant="outline"
                            className="border-primary/40 py-1.5 px-3"
                        >
                            {item}
                            <button
                                type="button"
                                className="w-3 ml-2"
                                onClick={() => {
                                    onChange(value.filter((i) => i !== item));
                                }}
                            >
                                <XIcon className="p-0.5 w-4 h-auto rounded-full bg-foreground/10 hover:bg-foreground/20 transition-all duration-300 ease-in-out" />
                            </button>
                        </Badge>
                    ))}
                </div>
            </>
        );
    }
);
