export interface Message {
    sender: "user" | "goia";
    text: string;
}

export interface Medicament {
    name: string;
    frequency: string [];
    durationDays: string;
    durationWeeks: string;
    durationMonths: string;
}

export interface MorningStiffnessEntry {
    date: string;
    morningStiffness: boolean;
}

export interface TemperatureEntry {
    date: string;
    temperature: number;
}

export interface MySpeechRecognitionEvent {
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string;
            };
        };
    };
}

export type MySpeechRecognition = {
    start: () => void;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: MySpeechRecognitionEvent) => void;
    onerror: (event: { error: string }) => void;
    onend: () => void;
    onstart: () => void;
};


export interface StiffnessEntry {
    date: string;
    present: boolean;
}

export interface MentalBurdenEntry {
    date: string;
    level: number;
}

export interface ChartData {
    date: string;
    temperatur: number;
    mentalBurden: number;
}