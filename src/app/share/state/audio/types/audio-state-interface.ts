import { AudioInterface } from 'src/app/share/types/audio-interface';

export interface AudioStateInterface {
  isLoading: boolean;
  audio: AudioInterface[];
  error: string | null;
}
