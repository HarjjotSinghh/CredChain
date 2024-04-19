import * as React from "react";
import { cn } from "@/utils/cn";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type OptionType = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    heading: string;
}

function MultiSelect({
    options,
    selected,
    onChange,
    className,
    heading,
    ...props
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item));
    };

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full border-2 border-primary/50 bg-transparent hover:bg-primary/5 transition-all duration-300 ease-in-out-sine mx-auto justify-between rounded-2xl relative px-6 py-4 ${selected.length > 0 ? "h-full" : "h-14"}`}
                    onClick={() => setOpen(!open)}
                >
                    {!(selected.length > 0) && (
                        <div className="lg:text-base text-sm absolute inset-0 flex items-center justify-center">
                            {heading}
                        </div>
                    )}
                    <div className="flex gap-2.5 flex-wrap">
                        {selected.map((item) => (
                            <Badge
                                variant="outline"
                                key={item}
                                className="p-2 px-4 lg:text-base text-sm"
                                onClick={() => handleUnselect(item)}
                            >
                                {item}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-2xl p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    onChange(
                                        selected.includes(option.value)
                                            ? selected.filter(
                                                  (item) =>
                                                      item !== option.value
                                              )
                                            : [...selected, option.value]
                                    );
                                    setOpen(true);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4 text-foreground/80",
                                        selected.includes(option.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export { MultiSelect };
