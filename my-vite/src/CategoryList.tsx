import { useGetCategoriesQuery } from "../services/apiCategory";

const DEFAULT_IMAGE = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFuzBAoFSdubKf3yBfdGRGazm5trkqF-upsLbFMq-jOrsfaVTvOordBHp5Iof_xjZCvKHrvhHd6FfLQjZCbJLwOoZm81uHzP8C80uKaw";

export const CategoryList = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка</p>;

  return (
    <div className="categories">
      {categories?.map((cat) => (
        <div key={cat.id} className="card">
          <img src={cat.image ? "https://lohika.itstep.click/images/200_" + cat.image : DEFAULT_IMAGE} alt={cat.title} />
          <h3>{cat.title}</h3>
            <p>Пріоритет: {cat.priority}</p>
            <h3>{cat.id}</h3>
        </div>
      ))}
    </div>
  );
};