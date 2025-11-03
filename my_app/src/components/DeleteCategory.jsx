import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import axios from 'axios';

const DeleteCategory = () => {
  const [form] = Form.useForm();

  const showConfirmAndDelete = (values) => {
    Modal.confirm({
      title: 'Підтвердження видалення',
      content: 'Чи ви точно впевнені, що бажаєте видалити категорію?',
      okText: 'Видалити',
      okType: 'danger',
      cancelText: 'Скасувати',
      onOk: async () => {
        try {
          
          
          const res = await axios.delete(`https://lohika.itstep.click/api/Categories/delete/${values.id}`);
          if (res.status === 200 || res.status === 204) {
            message.success('Категорію успішно видалено');
            form.resetFields();
          } else {
            message.error('Сервер повернув невідомий статус: ' + res.status);
          }
        } catch (err) {
          console.error('Delete error:', err);
          
          const text = err?.response?.data?.message || err.message || 'Помилка при видаленні';
          message.error(text);
        }
      }
    });
  };

  const onFinish = (values) => {
    if (!values.id || !values.id.toString().trim()) {
      message.error('Будь ласка, вкажіть ID категорії для видалення');
      return;
    }
    showConfirmAndDelete(values);
  };

  return (
    <div style={{ maxWidth: 720, margin: '1rem auto', padding: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}>
      <h3>Видалити категорію</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="ID категорії"
          name="id"
          rules={[{ required: true, message: 'Вкажіть ID категорії' }]}
        >
          <Input placeholder="Введіть ID (наприклад, числовий або рядковий)" />
        </Form.Item>

        <Form.Item>
          <Button danger type="primary" htmlType="submit">Видалити категорію</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeleteCategory;
