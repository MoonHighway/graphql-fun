import { useMemo } from "react";
import { random } from "faker";

export const useRandomPosition = (height, width) => {
  const bounds = useMemo(() => ({ height, width }), [height, width]);
  let top, left;

  switch (Math.floor(Math.random() * 8)) {
    case 0:
      top = `${random.number({ min: 0, max: bounds.height * 0.25 })}px`;
      left = `${random.number({ min: 0, max: bounds.width * 0.25 })}px`;
      break;
    case 1:
      top = `${random.number({ min: 0, max: bounds.height * 0.25 })}px`;
      left = `${random.number({
        min: bounds.width * 0.25,
        max: bounds.width * 0.75
      })}px`;
      break;
    case 2:
      top = `${random.number({ min: 0, max: bounds.height * 0.25 })}px`;
      left = `${random.number({
        min: bounds.width * 0.75 - 100,
        max: bounds.width - 60
      })}px`;
      break;
    case 3:
      top = `${random.number({
        min: bounds.height * 0.25,
        max: bounds.height * 0.75
      })}px`;
      left = `${random.number({ min: 0, max: bounds.width * 0.25 })}px`;
      break;
    case 4:
      top = `${random.number({
        min: bounds.height * 0.25,
        max: bounds.height * 0.75
      })}px`;
      left = `${random.number({
        min: bounds.width * 0.75 - 100,
        max: bounds.width - 60
      })}px`;
      break;
    case 5:
      top = `${random.number({
        min: bounds.height * 0.75,
        max: bounds.height - 60
      })}px`;
      left = `${random.number({ min: 0, max: bounds.width * 0.25 })}px`;
      break;
    case 6:
      top = `${random.number({
        min: bounds.height * 0.75,
        max: bounds.height - 60
      })}px`;
      left = `${random.number({
        min: bounds.width * 0.25,
        max: bounds.width * 0.75
      })}px`;
      break;
    default:
      top = `${random.number({
        min: bounds.height * 0.75,
        max: bounds.height - 60
      })}px`;
      left = `${random.number({
        min: bounds.width * 0.75 - 100,
        max: bounds.width - 60
      })}px`;
      break;
  }

  return [top, left];
};
