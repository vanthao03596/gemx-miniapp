import { CustomHeader } from "@/components/CustomHeader";
import { ResearchCard } from "@/components/ResearchCard";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import Svg from "@/icon/svg";
import { ResearchData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./researchPage.module.scss";

const ResearchPage = () => {
  const axiosAuth = useAxiosAuth();

  const fetchLastResearch = async () => {
    const { data } = await axiosAuth.get<ResearchData>("/latest-research");
    return data;
  };

  const { data } = useQuery({
    queryKey: ["last-research"],
    queryFn: () => fetchLastResearch(),
  });

  if (!data) return null;

  const { data: researchData } = data;

  return (
    <div className={styles.researchPage}>
      <CustomHeader title="Researchs" />
      <div className={styles.researchContainer}>
        {researchData.map(
          ({
            id,
            img_path,
            title,
            content_short,
            created_at,
            slug,
            user,
            research_coin,
          }) => (
            <ResearchCard
              key={`card-${id}`}
              src={img_path}
              title={title}
              desc={content_short}
              created={created_at}
              slug={slug}
              ava={user.image_path as string}
              name={user.name as string}
              assets={research_coin}
            />
          )
        )}
        <Link to="https://gemx.io/research">
          <p>Figure out more other research articles</p>
          <Svg src="/icons/right-arrow-circle.svg" className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default ResearchPage;
