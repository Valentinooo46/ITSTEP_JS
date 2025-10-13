function Profile({ name, phone, email, city, experience, skills }) {
  return (
    <div>
      <h2>{name}</h2>
      <p> Телефон: {phone}</p>
      <p> Email: {email}</p>
      <p> Місто: {city}</p>
      <p> Досвід: {experience}</p>
      <p> Навички: {skills.join(', ')}</p>
    </div>
  );
}

export default Profile;