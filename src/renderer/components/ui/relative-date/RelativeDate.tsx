import RelativeTime from '@yaireo/relative-time';
import { useState } from 'react';

type RelativeDateProps = {
  datetime: Date | string | undefined;
};

const RelativeDate = ({ datetime }: RelativeDateProps) => {
  const [relativeTimeEn] = useState<RelativeTime>(new RelativeTime({ locale: 'en' }));

  const format = (): string | null => {
    if (typeof datetime === 'undefined') return null;
    const date = datetime instanceof Date ? datetime : new Date(datetime);
    return relativeTimeEn.from(date);
  };

  return <span>{format()}</span>;
};

export default RelativeDate;
