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
    height: (props) => (props.subject === 'articledetail' ? 130 : 100),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: (props) => (props.subject === 'articledetail' ? 0 : '50%'),
    boxShadow: '0 10px 30px rgba(0,37,132,.06)',
    display: 'flex',
  },
  formContainer: {
    display: 'block',
    textAlign: 'center',
    height: (props) => (props.subject === 'articledetail' ? '100%' : 'inherit'),
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

  const isValidPath = image && typeof image === 'string' && image !== '';

  const PhotoPaper = () => (
    <label htmlFor={id}>
      {isValidPath ? (
        <MyAvatar
          imagePath={image as string}
          subject={subject}
          size="fullWidth"
          shape="square"
          alt="image uploader"
        />
      ) : (
        <Box
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
    <FormControl className={classes.formContainer}>
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
