import { ReactElement, cloneElement, useCallback, useEffect, useState } from 'react';
import useOutsideClick from 'renderer/hooks/use-outside-click';
import * as S from './styles';

const MAX_MENU_HEIGHT = 200;
const AVG_OPTION_HEIGHT = 34;
const MENU_PADDINGS = 8;

type DropdownProps = {
  trigger: ReactElement;
  menu: Array<any>;
  position?: 'right' | 'left';
};

const Dropdown = ({ trigger, menu, position = 'right' }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  };

  const ref = useOutsideClick<HTMLUListElement>(handleClickOutside);

  const handleOpen = () => {
    setOpen(!open);
  };

  const determineDropUp = useCallback(() => {
    if (!ref.current) return;

    const menuHeight = Math.min(
      MAX_MENU_HEIGHT,
      menu.length * AVG_OPTION_HEIGHT + MENU_PADDINGS
    );
    const instOffsetWithMenu = ref.current.getBoundingClientRect().top + menuHeight;
    const dropUp = instOffsetWithMenu >= window.innerHeight;

    if (dropUp) ref.current.classList.add('drop-up');
    else ref.current.classList.remove('drop-up');
  }, [ref, menu.length]);

  useEffect(() => {
    determineDropUp();
  }, [open, determineDropUp]);

  return (
    <S.Dropdown>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <S.Menu position={position} ref={ref}>
          {menu.map((menuItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <S.MenuItem key={index}>
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </S.MenuItem>
          ))}
        </S.Menu>
      ) : null}
    </S.Dropdown>
  );
};

export default Dropdown;
