export function getIncreasingSequence(options: {
  start?: number;
  end: number;
}) {
  let { start, end } = options;
  if (start === undefined) {
    if (end < 0) {
      throw new Error("end cannot be negative without providing a start value");
    }
    start = 0;
  } else if (start > end) {
    throw new Error("start cannot be of a higher value than end");
  }

  const output: number[] = [];
  for (let i = start; i <= end; i++) {
    output.push(i);
  }
  return output;
}

export interface TimeValueOptions {
  label: string;
  value: number;
}
export function getNumericTimeValues(options: {
  start?: number;
  end: number;
}): TimeValueOptions[] {
  return getIncreasingSequence(options).map((num) => ({
    label: String(num),
    value: num,
  }));
}
export function getMonthValues(): TimeValueOptions[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.map((month, index) => ({
    label: `${index + 1} (${month})`,
    value: index + 1,
  }));
}
export function getDayOfWeekValues(): TimeValueOptions[] {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days.map((day, index) => ({
    label: `${index} (${day})`,
    value: index,
  }));
}

/*
  "minute", // 0 - 59
  "hour", // 0 - 23
  "day of the month", // 1 - 31
  "month", // 1 - 12
  "day of the week" // 0 - 6 (Sun - Sat)
*/
export const timeValueOptionsMap: Record<
  TimeUnitValue,
  Record<TimeIntervalValue, TimeValueOptions[]>
> = {
  second: {
    at: getNumericTimeValues({ end: 59 }),
    from: getNumericTimeValues({ end: 59 }),
    every: getNumericTimeValues({ start: 1, end: 59 }),
  },
  minute: {
    at: getNumericTimeValues({ end: 59 }),
    from: getNumericTimeValues({ end: 59 }),
    every: getNumericTimeValues({ start: 1, end: 59 }),
  },
  hour: {
    at: getNumericTimeValues({ end: 23 }),
    from: getNumericTimeValues({ end: 23 }),
    every: getNumericTimeValues({ start: 1, end: 23 }),
  },
  dayOfMonth: {
    at: getNumericTimeValues({ start: 1, end: 31 }),
    from: getNumericTimeValues({ start: 1, end: 31 }),
    every: getNumericTimeValues({ start: 1, end: 31 }),
  },
  month: {
    at: getMonthValues(), // name of month
    from: getMonthValues(), // name of month
    every: getNumericTimeValues({ start: 1, end: 12 }),
  },
  dayOfWeek: {
    at: getDayOfWeekValues(), // name of day
    from: getDayOfWeekValues(), // name of day
    every: getNumericTimeValues({ start: 1, end: 7 }),
  },
};

export function getTimeValueOptions(
  timeUnit: TimeUnitValue,
  timeInterval: TimeIntervalValue
): TimeValueOptions[] {
  return timeValueOptionsMap[timeUnit][timeInterval];
}

export function capitalize(str: string) {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function getCronstringFromCronState(cronState: CronState): string {
  // We use timeUnitOptions since it's an array so order is guaranteed from seconds > day of week
  let timeUnits = timeUnitOptions.map((timeUnitOption) => timeUnitOption.value);
  let cronString = "";
  timeUnits.forEach((timeUnit, tuIndex) => {
    let timeIntervalConfigs = cronState[timeUnit];
    if (timeIntervalConfigs) {
      timeIntervalConfigs.forEach((timeIntervalConfig, tiIndex) => {
        if (timeIntervalConfig.interval === "at") {
          cronString += timeIntervalConfig.value;
        }
        if (timeIntervalConfig.interval === "from") {
          cronString += `${timeIntervalConfig.value[0]}-${timeIntervalConfig.value[1]}`;
        }
        if (timeIntervalConfig.interval === "every") {
          cronString +=
            timeIntervalConfig.value === 1
              ? "*"
              : "*/" + timeIntervalConfig.value;
        }
        if (tiIndex < timeIntervalConfigs.length - 1) {
          cronString += ",";
        }
      });
      if (tuIndex < timeUnits.length - 1) {
        cronString += " ";
      }
    }
  })
  return cronString
}

export type CronState = Record<
  TimeUnitValue,
  Array<{ interval: TimeIntervalValue; value: number | number[] }> | null
>;

export const initialState: CronState = {
  second: [
    {
      interval: "at",
      value: 0,
    },
  ],
  minute: [
    {
      interval: "from",
      value: [1, 15],
    },
  ],
  hour: [
    {
      interval: "every",
      value: 1,
    },
  ],
  dayOfMonth: [
    {
      interval: "every",
      value: 1,
    },
  ],
  month: [
    {
      interval: "every",
      value: 1,
    },
  ],
  dayOfWeek: [
    {
      interval: "every",
      value: 1,
    },
  ],
};

export type TimeUnitValue =
  | "second"
  | "minute"
  | "hour"
  | "dayOfMonth"
  | "month"
  | "dayOfWeek";
export interface TimeUnitOption {
  label: string;
  value: TimeUnitValue;
}
export const timeUnitOptions: TimeUnitOption[] = [
  {
    value: "second",
    label: "second",
  },
  {
    value: "minute",
    label: "minute",
  },
  {
    value: "hour",
    label: "hour",
  },
  {
    value: "dayOfMonth",
    label: "day of month",
  },
  {
    value: "month",
    label: "month",
  },
  {
    value: "dayOfWeek",
    label: "day of week",
  },
];

export type TimeIntervalValue = "at" | "from" | "every";
export interface TimeIntervalOption {
  label: string;
  value: TimeIntervalValue;
}
export const timeIntervalOptions: TimeIntervalOption[] = [
  { label: "at", value: "at" },
  { label: "from...", value: "from" },
  { label: "every", value: "every" },
];
