import Form from './components/CategoryForm';
import ListView from './components/CategoryList';

export default function Page() {
  return (
    <main className="p-5 flex flex-col md:flex-row gap-5">
      <Form />
      <ListView />
    </main>
  );
}
