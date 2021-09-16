import React, { useState } from 'react';
import { FormControl, Grid, IconButton, Box } from '@material-ui/core';
import AddAPhotoOutlined from '@material-ui/icons/AddAPhotoOutlined';
import baseStyles from '../style/styles';

interface Props {
  image?: File;
  input: InputProps;
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

const ImageUploader: React.FC<Props> = ({ input: { inputName, onImageUpload, id }, image }) => {
  const [file, setFile] = useState<File>();
  const classes = baseStyles();

  const ImageButton = () => (
    <label htmlFor={id}>
      <IconButton color="primary" component="span">
        <AddAPhotoOutlined />
      </IconButton>
    </label>
  );

  const PhotoPaper = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.photoPreview}
      style={{ backgroundImage: `url(${file ? getImageURL(file) : getImageURL(image)})` }}
    >
      {!file && !image && <ImageButton />}
    </Box>
  );

  return (
    <FormControl>
      <Grid container spacing={2} className={classes.container}>
        <ImageInput
          onImageUpload={(img) => {
            setFile(img);
            onImageUpload(img);
          }}
          id={id}
          inputName={inputName}
        />
        <Grid item xs={12}>
          <PhotoPaper />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export { ImageInput };

export default ImageUploader;
