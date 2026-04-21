
import "../styles/HeroUITheme.css"
import { InputPanel } from '../components/InputPanel';
import { useSearch } from '../hooks/useSearch';
import { OutputPanel } from "../components/OutputPanel";
import { useState } from "react";
import type { SearchResponse } from "@/types";


function Home() {
  
  const {results, loading, search} = useSearch();

  
  // const [results, setResults] = useState<SearchResponse | null>({
  //   id: "1",
  //   time: 1,
  //   data: {
  //     contacts: [
  //       { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  //       { name: "Jane Doe", email: "jane@example.com", phone: "987-654-3210" },
  //     ],
  //   }
  // });


  return (
    <>
      <div className="gap-6 flex flex-col max-w-7xl mx">
        <InputPanel
        search={search}
        />

        <OutputPanel
        results={results}
        loading={loading}/>
      </div>
    </>
  );
}

export default Home;