/*"use client";
import { useEffect, useState } from "react";
export default function TestUseEffect() {
const [datas, setDatas] = useState('');
function RecupJson() {
fetch('mesdonnees.json').then(function(result){return result.json();})
.then(function(dataJson){setDatas(dataJson);});

}
useEffect(function(){RecupJson();}, []); // L'effet ne s'exécute qu'une seule fois
return (
<div className="flex justify-center items-center h-screen bg-gray-100">
    <div>
<p className="text-xl font-bold">Données : {datas.message}</p>
<p className="text-xl font-bold">Données : {datas.auteur}</p>
   </div>
</div>
);
}*/



//Implémenter un indicateur de chargement

"use client";
import { useEffect, useState } from "react";
export default function TestUseEffect() {
    const [datas, setDatas] = useState('');
    const [loading, setLoading] = useState(true);
    function RecupJson() {
        fetch('mesdonnees.json').then(function (result) { return result.json(); })
            .then(function (dataJson) { setDatas(dataJson); });

        setLoading(false); // Le chargement est terminé
    }
    useEffect(function () {
        setTimeout(() => RecupJson(), 1000);
    }, []); // L'effet ne s'exécute qu'une seule fois


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {loading ?
                (<div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-semibold">Chargement...</p>
                </div>) :

                (<p className="text-xl font-bold">Données récupérées : {datas.message}</p>)
            }

        </div>
    );
}


