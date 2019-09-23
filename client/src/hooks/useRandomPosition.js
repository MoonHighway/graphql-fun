import { useReducer, useMemo, useLayoutEffect } from "react";
import { random } from "faker";

export const useRandomPosition = (height, width) => {
  const [{ top, left }, set] = useReducer((_, s) => s, {
    top: "0px",
    left: "0px"
  });
  const bounds = useMemo(() => ({ height, width }), [height, width]);

  useLayoutEffect(() => {
    switch (Math.floor(Math.random() * 8)) {
      case 0:
        set({
          top: `${random.number({ min: 0, max: bounds.height * 0.25 })}px`,
          left: `${random.number({ min: 0, max: bounds.width * 0.25 })}px`
        });
        break;
      case 1:
        set({
          top: `${random.number({ min: 0, max: bounds.height * 0.25 })}px`,
          left: `${random.number({
            min: bounds.width * 0.25,
            max: bounds.width * 0.75
          })}px`
        });

        break;
      case 2:
        set({
          top: `${random.number({ min: 0, max: bounds.height * 0.25 })}px`,
          left: `${random.number({
            min: bounds.width * 0.75 - 100,
            max: bounds.width - 60
          })}px`
        });

        break;
      case 3:
        set({
          top: `${random.number({
            min: bounds.height * 0.25,
            max: bounds.height * 0.75
          })}px`,
          left: `${random.number({ min: 0, max: bounds.width * 0.25 })}px`
        });

        break;
      case 4:
        set({
          top: `${random.number({
            min: bounds.height * 0.25,
            max: bounds.height * 0.75
          })}px`,
          left: `${random.number({
            min: bounds.width * 0.75 - 100,
            max: bounds.width - 60
          })}px`
        });

        break;
      case 5:
        set({
          top: `${random.number({
            min: bounds.height * 0.75,
            max: bounds.height - 60
          })}px`,
          left: `${random.number({ min: 0, max: bounds.width * 0.25 })}px`
        });

        break;
      case 6:
        set({
          top: `${random.number({
            min: bounds.height * 0.75,
            max: bounds.height - 60
          })}px`,
          left: `${random.number({
            min: bounds.width * 0.25,
            max: bounds.width * 0.75
          })}px`
        });

        break;
      default:
        set({
          top: `${random.number({
            min: bounds.height * 0.75,
            max: bounds.height - 60
          })}px`,
          left: `${random.number({
            min: bounds.width * 0.75 - 100,
            max: bounds.width - 60
          })}px`
        });

        break;
    }
  }, [bounds]);

  return [top, left];
};
