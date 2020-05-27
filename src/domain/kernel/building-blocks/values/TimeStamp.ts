import { ValueObject } from '../../ddd';

type TimeStampProperties = {
  epochTimestamp: number;
};
export class TimeStamp extends ValueObject<TimeStampProperties> {
  constructor(epochTimestamp: number) {
    super({ epochTimestamp });
  }

  get value(): number {
    return this._properties.epochTimestamp;
  }

  public static now(): TimeStamp {
    return TimeStamp.fromMillisecondTimeStamp(Date.now());
  }

  public static fromMillisecondTimeStamp(
    millisecondTimeStamp: number,
  ): TimeStamp {
    return new TimeStamp(millisecondTimeStamp / 1000);
  }
}
