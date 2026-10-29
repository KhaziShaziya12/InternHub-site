/* Static sample data: departments, companies and internships. */
const DEPTS=["Computer Science","Information Technology","Electronics","Electrical","Mechanical","Civil","Business Administration","Other"];
const STATUS=["Pending","Accepted","Rejected"],SC={Pending:"b-wa",Accepted:"b-ok",Rejected:"b-er"};
const COMPANIES=[[1,"Lumen Labs","Software"],[2,"Quantora Analytics","Data & AI"],[3,"Pebble Studio","Design"],[4,"Nimbus Pay","Fintech"],[5,"Trailhead Apps","Mobile"],[6,"Cartwheel Logistics","Operations"],[7,"Voltgrid Energy","Energy"],[8,"Brightpath Consulting","Consulting"],[9,"Stonebridge Infra","Construction"],[10,"Medlink Health","Healthcare Tech"],[11,"Greenleaf Foods","Consumer Goods"],[12,"Orbit Learning","EdTech"],[13,"Bastion Secure","Cybersecurity"],[14,"Harbor Capital","Finance"]].map(a=>({id:a[0],name:a[1],industry:a[2]}));
const INTERNSHIPS=[
[1,1,"Frontend Engineering Intern","Build React interfaces for a design-tooling product and ship features in a 12-week program.","Bengaluru","B.Tech CSE/IT, 3rd year, CGPA 7.0+"],
[2,2,"Data Science Intern","Build forecasting models with Python and SQL alongside senior analysts.","Hyderabad","CSE/IT/ECE, knowledge of Python and statistics"],
[3,3,"Product Design Intern","Prototype in Figma and run usability sessions with real users.","Remote","Any department, portfolio required"],
[4,4,"Backend Engineering Intern","Design REST APIs and database schemas for a payments platform.","Remote","CSE/IT, SQL and one backend language"],
[5,5,"Mobile Developer Intern","Develop Flutter screens for an outdoor navigation app.","Pune","CSE/IT/ECE, 2nd year or above"],
[6,6,"Operations Analyst Intern","Analyze delivery metrics and improve warehouse workflows.","Chennai","Mechanical/Business Administration, Excel skills"],
[7,1,"QA Automation Intern","Write automated tests and help the team catch bugs before release.","Bengaluru","CSE/IT, basic programming skills"],
[8,2,"Machine Learning Intern","Fine-tune and evaluate language models with research engineers.","Hyderabad","CSE/IT, ML coursework, CGPA 7.5+"],
[9,7,"Electrical Engineering Intern","Assist with load analysis and monitoring at a solar and grid operations center.","Nagpur","Electrical/Electronics, 3rd year or above"],
[10,7,"Embedded Systems Intern","Program microcontrollers and test firmware for smart energy meters.","Hyderabad","Electronics/Electrical, C programming"],
[11,8,"Business Analyst Intern","Research client markets, build Excel models and prepare slide decks for consultants.","Mumbai","Business Administration, strong Excel skills"],
[12,9,"Civil Site Engineering Intern","Support site surveys, quantity estimates and safety inspections on live projects.","Chennai","Civil, 3rd year or above"],
[13,9,"Structural Design Intern","Model and check building structures using AutoCAD and structural analysis software.","Hyderabad","Civil, AutoCAD knowledge"],
[14,10,"Health Data Intern","Clean and analyze anonymised hospital data to help clinics plan their capacity.","Remote","Computer Science/IT/Other, SQL and Python"],
[15,11,"Brand Marketing Intern","Plan social campaigns, track results and support product launches.","Mumbai","Business Administration, any year"],
[16,12,"Content and Community Intern","Write study guides and grow a student learning community online.","Remote","Any department, strong writing skills"],
[17,13,"Cybersecurity Intern","Help run vulnerability scans and write clear security reports for clients.","Remote","CSE/IT/Electronics, networking basics"],
[18,14,"Finance Analyst Intern","Build valuation models, track markets and prepare investment notes.","Delhi","Business Administration, finance coursework"],
[19,6,"Warehouse Automation Intern","Help design and test conveyor and sorting systems for a new distribution center.","Chennai","Mechanical/Electrical, CAD basics"],
[20,3,"UX Research Intern","Plan user interviews, synthesize findings and present them to product teams.","Hyderabad","Any department, interest in design"]
].map(a=>({id:a[0],cid:a[1],title:a[2],desc:a[3],loc:a[4],elig:a[5]}));
