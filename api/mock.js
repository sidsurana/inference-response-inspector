export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST required'});
 const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
 if(!['slow','fast'].includes(body.mode))return res.status(400).json({error:'mode must be slow or fast'});
 res.setHeader('Cache-Control','no-store');
 if(body.mode==='slow')await new Promise(resolve=>setTimeout(resolve,160));
 return res.status(200).json({id:'synthetic-fixture',object:'chat.completion',model:'fixture-no-llm',choices:[{index:0,message:{role:'assistant',content:'Synthetic deterministic response. No inference was performed.'},finish_reason:'stop'}],fixture_mode:body.mode});
}
