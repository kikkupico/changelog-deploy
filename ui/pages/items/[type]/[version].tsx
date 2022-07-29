import path from "path";
import { promises as fs } from "fs";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { DATA_DIRS, typeFolderMapping } from "../../../constants";

type ChangeLogEntry = {
  pr_link: string;
  changelog: string;
};

export default function LogEntry({ data }: { data: ChangeLogEntry }) {
  const router = useRouter();
  const [type, version] = [router.query.type, router.query.version];

  return (
    <>
      <div className="sm:text-center mb-12">
        <h1 className="text-4xl font-semibold">{`${type} ${version}`}</h1>
      </div>
      <div className="block sm:flex">
        <div className="w-full mb-4 sm:mb-0 sm:w-64 sm:mr-6">
          <div className="flex items-center text-sm justify-center bg-white border-4 border-brandCyan-400 circle mb-2 rounded-full">
            🎉
          </div>
          <p className="font-semibold text-xs mb-1">Jan. 1, 2022</p>
          <p className="text-xs">
            <a className="hover:text-brandBlue-600" href="#!">
              Major Release
            </a>
            <span className="mx-1">•</span>
            <a className="hover:text-brandBlue-600" href="#!">
              Hasura CE
            </a>
          </p>
        </div>
        <div>
          <p className="mb-2 text-gray-700">
            This is the description of the updates
          </p>
          <div className="relative text-gray-700">
            <p className="break-all">{data.changelog}</p>
            <a className="text-sm text-brandCyan-400" href={data.pr_link}>
              {data.pr_link}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [type, version] = [params?.type || "", params?.version || ""];
  const jsonDirectory = path.join(
    path.join(process.cwd(), "/../", (typeFolderMapping as any)[flatten(type)])
  );
  const fileContents = await fs.readFile(
    jsonDirectory + `/${version}/changelog.json`,
    "utf8"
  );
  //Return the content of the data file in json format
  return {
    props: {
      data: JSON.parse(fileContents),
    },
  };
};

export async function getStaticPaths() {
  const items = (
    await Promise.all(
      DATA_DIRS.map((dirPath) =>
        readIfExists(path.join(process.cwd(), "/../", dirPath))
      )
    )
  ).flatMap((e, i) =>
    e.map((dirname) => {
      return {
        params: {
          version: path.parse(dirname).base,
          type: extractFirstFolder(DATA_DIRS[i]),
        },
      };
    })
  );

  return {
    paths: items,
    fallback: false,
  };
}

function extractFirstFolder(path: string) {
  return path.split("/")[1];
}

function flatten(str: string | string[]) {
  if (typeof str === "string") return str;
  else return str.reduce((a, b) => a + b);
}

async function readIfExists(path: string) {
  try {
    await fs.stat(path);
    return fs.readdir(path);
  } catch (e) {
    return Promise.resolve([]);
  }
}
