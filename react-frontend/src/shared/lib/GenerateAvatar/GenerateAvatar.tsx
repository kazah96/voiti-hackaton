import { FC, useEffect, useRef, useState } from 'react';

import { GenerateAvatarProps } from './types';
import useStyles from './styles';
import { colorFromString } from '../ColorString/generateColorFromString';

const AvatarColors: Array<string> = [
  '#FFBE16',
  '#F59337',
  '#EF4D4B',
  '#F05076',
  '#F170B6',
  '#8656AF',
  '#535EEC',
  '#3CA9C2',
  '#1AB05F',
  '#ABBA4D',
];

export const GenerateAvatar: FC<GenerateAvatarProps> = ({
  size = {
    width: 96,
    height: 96,
  },
  name,
  onGenerateUri,
}) => {
  const [uri, setUri] = useState(null);
  const classes = useStyles();
  const canvasRef = useRef(null);
  const charFirstName = name?.charAt(0) || '';
  const charLasttName = name?.charAt(1) || '';
  const { width, height } = size;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    ctx.beginPath();
    ctx.fillStyle = colorFromString(`${name}`, AvatarColors);
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff';

    ctx.font = 'bold 16px Open Sans';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(`${charFirstName}${charLasttName}`, centerX, centerY);
    setUri(canvasRef.current.toDataURL());
  }, [charFirstName, charLasttName, height, name, width]);

  useEffect(() => {
    if (uri) {
      onGenerateUri(uri);
    }
  }, [onGenerateUri, uri]);

  return (
    <>
      <canvas className={classes.canvas} ref={canvasRef} width={width} height={height} />
    </>
  );
};
