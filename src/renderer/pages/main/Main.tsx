import { observer } from 'mobx-react-lite';
import { useStore } from 'renderer/store';
import BasicLayout from '../../layouts/basicLayout';

const Main = observer(() => {
  const { secondsPassed } = useStore();
  return (
    <BasicLayout>
      <div>Main Page - {secondsPassed} </div>
    </BasicLayout>
  );
});

export default Main;
