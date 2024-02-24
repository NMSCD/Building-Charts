import type { BaseObject } from './baseObject';

export interface Base {
  BaseVersion: number;
  OriginalBaseVersion: number;
  GalacticAddress: string;
  Position: number[];
  Forward: number[];
  UserData: number;
  LastUpdateTimestamp: number;
  Objects: BaseObject[];
  RID: '';
  Owner: {
    LID: string;
    UID: string;
    USN: string;
    PTK: string;
    TS: number;
  };
  Name: string;
  BaseType: {
    PersistentBaseTypes: string;
  };
  LastEditedById: string;
  LastEditedByUsername: string;
  ScreenshotAt: number[];
  ScreenshotPos: number[];
  GameMode: {
    PresetGameMode: string;
  };
  Difficulty: {
    DifficultyPreset: {
      DifficultyPresetType: string;
    };
    PersistentBaseDifficultyFlags: number;
  };
  PlatformToken: string;
  IsReported: boolean;
  IsFeatured: boolean;
  AutoPowerSetting: {
    BaseAutoPowerSetting: string;
  };
}
