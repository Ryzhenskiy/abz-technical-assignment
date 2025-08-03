import { useState, useEffect } from 'react';
import styles from './Form.module.scss';
import axios from 'axios';
import successImage from '../../assets/success-image.svg';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';
import CustomButton from '../CustomButton/CustomButton';
import { CustomInput } from '../CustomInput/CustomInput';
import Preloader from '../Preloader/Preloader';
import '../../styles/base.scss';

const Form = ({ onSuccess }) => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const [userCreated, setUserCreated] = useState(false);

  const [token, setToken] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const validateForm = () => {
    let newErrors = {};

    const nameRegex = /^[a-zA-Z\s]{2,60}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name should be 2-60 letters long';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone should match +380XXXXXXXXX format';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const fetchPositions = async () => {
    try {
      const res = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/positions`
      );

      console.log('Fetched positions:', res.data.positions);
      setPositions(res.data.positions);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchToken = async () => {
    try {
      const res = await axios.get(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token'
      );
      setToken(res.data.token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.position_id ||
      !formData.photo
    ) {
      console.error('All fields are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('position_id', formData.position_id);
    form.append('photo', formData.photo);

    setLoading(true);

    try {
      const res = await axios.post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        form,
        {
          headers: {
            Token: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onSuccess();

      setFormData({
        name: '',
        email: '',
        phone: '',
        position_id: '',
        photo: null,
      });
      setUserCreated(true);
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchPositions();
    fetchToken();
  }, []);

  useEffect(() => {
    setAllFieldsValid(
      formData.name &&
        formData.email &&
        formData.phone &&
        formData.position_id &&
        formData.photo
    );
  }, [formData]);

  if (userCreated) {
    return (
      <div className={styles.successContainer}>
        <h1>User successfully registered</h1>
        <img src={successImage} alt="Success" className={styles.successImage} />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <Heading>Working with POST request</Heading>
      <div className={styles.formContainer}>
        <form className={styles.desktopForm} onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            helperText="Please enter your full name"
            label={'Name'}
            error={!!errors.name}
            errorText={errors.name}
          />
          <CustomInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            helperText="Please enter a valid email address"
            label={'Email'}
            error={!!errors.email}
            errorText={errors.email}
          />

          <CustomInput
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            helperText="+38 (XXX) XXX - XX - XX"
            label={'Your phone'}
            error={!!errors.phone}
            errorText={errors.phone}
          />

          <div className={styles.formGroup}>
            <p className={styles.positionLabel}>Select your position</p>
            <div className={styles.radioGroup}>
              {positions.map((position) => (
                <label key={position.id} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="position_id"
                    value={position.id}
                    checked={formData.position_id === position.id.toString()}
                    onChange={handleChange}
                  />
                  <span className={styles.checkmark}></span>
                  {position.name}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.upload}>
            <label htmlFor="photoUpload" className={styles.uploadBox}>
              Upload
            </label>
            <input
              type="file"
              id="photoUpload"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className={styles.hiddenInput}
            />
            <Text className={styles.uploadText}>
              {formData.photo ? formData.photo.name : 'Upload your photo'}
            </Text>
          </div>

          <CustomButton type="submit" disabled={!allFieldsValid}>
            Sign up
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Form;
