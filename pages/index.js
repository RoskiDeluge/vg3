import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "../context/user";

export default function Home({ jobs }) {
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {jobs.map((job) => (
        <Link key={job.id} href={`/${job.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {job.title}
          </a>
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: jobs } = await supabase.from("job").select("*");

  return {
    props: {
      jobs,
    },
  };
};
