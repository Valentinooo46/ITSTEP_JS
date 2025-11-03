import React, { useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Item } = Form;

const CategoryForm = () => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState('');
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file) => {
    const isImage = file.type && file.type.startsWith('image/');
    if (!isImage) {
      message.error('Можна завантажувати тільки зображення (JPG/PNG/GIF)');
    }
    
    return isImage || Upload.LIST_IGNORE;
  };

  const handleChange = async (info) => {
    const f = info.file.originFileObj || info.file;
    if (!f) return;
    const isImage = f.type && f.type.startsWith('image/');
    if (!isImage) {
      setFileList([]);
      setPreview('');
      return;
    }
    try {
      const base64 = await getBase64(f);
      setPreview(base64);
      setFileList([info.file]);
    } catch (e) {
      console.error(e);
      message.error('Помилка обробки файлу');
    }
  };

  const onFinish = async (values) => {
    if (!preview) {
      message.error('Будь ласка, виберіть зображення');
      return;
    }

    const payload = {
      title: values.title,
      priority: values.priority,
      urlSlug: values.urlSlug,
      image: preview,
    };

    try {
      const res = await axios.post('https://lohika.itstep.click/api/Categories/add', payload);
      if (res.status === 200 || res.status === 201) {
        message.success('Категорію успішно додано');
        form.resetFields();
        setPreview('');
        setFileList([]);
      } else {
        message.error('Неочікувана відповідь сервера');
      }
    } catch (err) {
      console.error(err);
      message.error('Помилка при відправці даних на сервер');
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto 2rem', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
      <h3>Додати категорію</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Item
          label="Назва"
          name="title"
          rules={[{ required: true, message: 'Введіть назву' }, { min: 3, message: 'Мінімум 3 символи' }]}
        >
          <Input />
        </Item>

        <Item
          label="Пріоритет"
          name="priority"
          rules={[{ required: true, message: 'Вкажіть пріоритет' }, { type: 'number', min: 0, message: 'Не може бути від\'ємним' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Item>

        <Item
          label="URL слаг"
          name="urlSlug"
          rules={[{ required: true, message: 'Вкажіть urlSlug' }, { pattern: /^[a-z0-9-]+$/, message: 'Тільки малі літери, цифри та дефіс' }]}
        >
          <Input />
        </Item>

        <Item label="Зображення" required>
          <Upload
            accept="image/*"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Обрати зображення</Button>
          </Upload>
          {preview && (
            <div style={{ marginTop: 12 }}>
              <img src={preview} alt="preview" style={{ maxWidth: 240, borderRadius: 6, border: '1px solid #ddd' }} />
            </div>
          )}
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">Відправити</Button>
        </Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
