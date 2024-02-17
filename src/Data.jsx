import React, { useState, useEffect } from 'react';


const Data = () => {
    const [dates, setDates] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [outputData, setOutputData] = useState([]);
    const [number, setNumber] = useState(5)
    const [newsLines, setNewsLines] = useState([])
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://endoflife.date/api/all.json`);
                const data = await response.json();
                setDates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const News = () => {
        
        
            
             
           return (
           
            <div className='newsi'>

            <a href={newsLines.url}  target="_blank">
                <h2 className='news'>Homepage: </h2>
                <p>{newsLines.url}</p>
            </a>
            <a href={newsLines.download} target="_blank">
                <h2 className='news'>Download: </h2>
                <p>{newsLines.download}</p>
            </a>

        </div>
            )
        
    }

    const Output = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Version</th>
                        <th>Release-Datum</th>
                        <th>LTS</th>
                        <th>Support</th>
                        <th>EOL</th>
                    </tr>
                </thead>


                {outputData.map((data, index) => {

                    return (
                        (index < number) ?
                            <tr key={index}>
                                <td>{data.cycle}</td>
                                <td>{data.releaseDate}</td>
                                <td>{data.lts ? 'LTS' : ''}</td>
                                <td>{data.support}</td>
                                <td>{data.eol}</td>
                            </tr> : null
                    )
                })}

            </table>
        )
    }
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleButtonClick = async (e) => {
        if (!selectedValue) return
        setNumber(Number(e.target.dataset.value));

        // console.log(e.target.id, number)
        try {
            const response = await fetch(`https://endoflife.date/api/${selectedValue}.json`);
            const data = await response.json();
            setOutputData(data);
            
            const wireNews = await fetch(`https://eexpress-server.onrender.com/softwares/${selectedValue}`);
            const data2 = await wireNews.json();
            setNewsLines(data2);
            console.log(data2)


        } catch (error) {
         setNewsLines([])
        }
    };


    return (
        <>

            <div className="ausgabe">

                <div className="selector">
                    <h1 className='relatedH1'>Software</h1>
                    <select id="progs" onChange={handleSelectChange}>
                        <option selected={true} disabled={true}>-- Software wählen --</option>
                        {dates.map(date => (
                            <option key={date} value={date}>{date}</option>

                        ))}
                    </select>
                    <span className='buttons'>
                        <button id="btn1" data-value='5' onClick={handleButtonClick}>Alle Daten abrufen</button>
                        <button id="btn2" data-value='1' onClick={handleButtonClick}>Letzte Version abrufen</button>
                    </span>

                    <div id="output">
                        <Output />
                    </div>
                </div>
                <div id="news">
                    <h1 className='relatedH1'>Related Articles</h1>
                    <News />
                </div>
            </div>

        </>
    );
};

export default Data;