import { observer } from 'mobx-react-lite';
import { useStore } from 'renderer/store';
import Heading from './styles';

const PageTitle = observer(() => {
  const { pageTitle } = useStore();
  return <Heading>{pageTitle}</Heading>;
});

export default PageTitle;
