import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const JobDetails = ({ job }) => {
  const [campaignTitle, setCampaignTitle] = useState();
  const getCampaigns = async () => {
    const { data } = await supabase
      .from("campaign")
      .select("title")
      .eq("id", job.id)
      .single();

    setCampaignTitle(data?.title);
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{job.title}</h1>
      <p>{job.description}</p>
      <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
        {campaignTitle}
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: jobs } = await supabase.from("job").select("id");

  const paths = jobs.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: job } = await supabase
    .from("job")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      job,
    },
  };
};

export default JobDetails;
