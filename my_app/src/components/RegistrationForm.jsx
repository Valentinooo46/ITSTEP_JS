import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    gender: "",
    age: ""
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const validate = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Нік обов'язковий";
    }

    if (!formData.email) {
      newErrors.email = "Електронна адреса обов'язкова";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.gender) {
      newErrors.gender = "Оберіть стать";
    }

    if (!formData.age) {
      newErrors.age = "Вік обов'язковий";
    } else if (isNaN(formData.age) || formData.age < 12) {
      newErrors.age = "Вік має бути числом від 12 і більше";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Реєстрація успішна!\n${JSON.stringify(formData, null, 2)}`);
     
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Форма реєстрації</h2>
      <form onSubmit={handleSubmit} noValidate>
        
        <div className="mb-3">
          <label className="form-label">Нік</label>
          <input
            type="text"
            name="nickname"
            className="form-control"
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <div className="text-danger">{errors.nickname}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Електронна адреса</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Стать</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Оберіть --</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
            <option value="other">Інша</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Вік</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Зареєструватися
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;