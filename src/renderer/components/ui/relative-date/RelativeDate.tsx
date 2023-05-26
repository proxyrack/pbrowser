import RelativeTime from '@yaireo/relative-time';
import { useCallback, useEffect, useState } from 'react';

const UPDATE_PERIOD = 30 * 1000;

type RelativeDateProps = {
  datetime: Date | string | undefined;
};

const RelativeDate = ({ datetime }: RelativeDateProps) => {
  const [relativeTimeEn] = useState<RelativeTime>(new RelativeTime({ locale: 'en' }));
  const [relativeDate, setRelativeDate] = useState<string>('');

  const format = useCallback((): string => {
    if (typeof datetime === 'undefined') return '';
    const date = datetime instanceof Date ? datetime : new Date(datetime);

    return relativeTimeEn.from(date);
  }, [datetime, relativeTimeEn]);

  // refresh when date changes
  useEffect(() => {
    setRelativeDate(format());
  }, [format]);

  // refresh every UPDATE_PERIOD
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeDate(format());
    }, UPDATE_PERIOD);
    return () => {
      clearInterval(interval);
    };
  }, [format]);

  return <span>{relativeDate}</span>;
};

export default RelativeDate;
