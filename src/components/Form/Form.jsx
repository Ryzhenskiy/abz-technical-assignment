import styles from './Form.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import successImage from '../../assets/success-image.svg';
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

  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const [userCreated, setUserCreated] = useState(false);

  const [token, setToken] = useState('');

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

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.sectionTitle}>Working with POST request</h1>
      <div className={styles.formContainer}>
        <form className={styles.desktopForm} onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={styles.formInput}
          />

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.formInput}
          />

          <div className={styles.formGroup}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={styles.formInput}
            />
            <label htmlFor="phone" className={styles.phoneLabel}>
              +38 {'('}XXX{')'} XXX - XX - XX
            </label>
          </div>

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
            <p className={styles.uploadText}>
              {formData.photo ? formData.photo.name : 'Upload your photo'}
            </p>
          </div>

          <button type="submit" className="btn" disabled={!allFieldsValid}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
