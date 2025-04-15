export interface Song {
    title: string;
    artist: string;
    lyrics: {
        type: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro' | 'instrumental';
        lines: string[];
    }[];
    fileName?: string;
}