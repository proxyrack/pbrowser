import { ReactElement, cloneElement, useState } from 'react';
import useOutsideClick from 'renderer/hooks/use-outside-click';
import * as S from './styles';

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
