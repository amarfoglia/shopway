import React, { useState } from 'react';
import { FormControl, IconButton, Box, makeStyles, Theme } from '@material-ui/core';
import AddAPhotoOutlined from '@material-ui/icons/AddAPhotoOutlined';
import MyAvatar from './MyAvatar';

type Subject = 'user' | 'store' | 'articledetail';

interface Props {
  image?: File | string;
  input: InputProps;
  subject?: Subject;
}

interface InputProps {
  inputName: string;
  onImageUpload: (image: File) => void;
  id: string;
}

const getImageURL = (file?: File) => file && URL.createObjectURL(file);

const ImageInput: React.FC<InputProps> = ({ inputName, onImageUpload, id }) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const image = event.currentTarget?.files?.item(0);
    image && onImageUpload?.(image);
  };

  return (
    <input
      name={inputName}
      accept="image/*"
      style={{ display: 'none' }}
      id={id}
      type="file"
      onChange={handleChange}
    />
  );
};

const useStyles = makeStyles<Theme, { subject: Subject }>({
  photoPreview: {
    width: 100,
    height: (props) => (props.subject === 'user' ? 100 : 130),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: (props) => (props.subject === 'user' ? 'cover' : 'contain'),
    backgroundSize: 'cover',
    borderRadius: (props) => (props.subject === 'user' ? '50%' : 12),
    boxShadow: '0 10px 30px rgba(0,37,132,.06)',
  },
});

const ImageUploader: React.FC<Props> = ({
  input: { inputName, onImageUpload, id },
  image,
  subject = 'user',
}) => {
  const [file, setFile] = useState<File>();
  const classes = useStyles({ subject });

  const ImageButton = () => (
    <IconButton color="primary" component="span" aria-label="Add photo">
      <AddAPhotoOutlined />
    </IconButton>
  );

  const PhotoPaper = () => (
    <label htmlFor={id}>
      {typeof image === 'string' ? (
        <MyAvatar
          imagePath={image}
          subject={subject}
          size="fullWidth"
          shape="square"
          alt="image uploader"
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.photoPreview}
          style={{
            backgroundImage: `url(${file ? getImageURL(file) : getImageURL(image as File)})`,
          }}
        >
          {!file && !image && <ImageButton />}
        </Box>
      )}
    </label>
  );

  return (
    <FormControl style={{ display: 'contents' }}>
      <ImageInput
        onImageUpload={(img) => {
          setFile(img);
          onImageUpload(img);
        }}
        id={id}
        inputName={inputName}
      />
      <PhotoPaper />
    </FormControl>
  );
};

export { ImageInput };

export default ImageUploader;
