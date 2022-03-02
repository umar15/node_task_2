const fs = require("fs");

const build = () => {
	let config = fs.readFileSync("../configuration.json");
	let data = JSON.parse(config);

	data.model.map((item) => {
		fs.appendFile(
			`views/${item.name}.ejs`,
			`
         <form id="form" method="POST" action="/${item.name}/create${item.name}">
            ${item.field.map(
					(i) =>
						`
                  <label>${i[2]}</label>
                  <input type=${i[1]} name=${i[0]} id=${i[0]} value="" ${i[3]}/>
               `
				)}
            <input type="submit" id="submit"/>
         </form>
         `,
			(err) => {
				if (err) console.log("Error: ", err);
				console.log("Saved");
			}
		);
	});
};

build();
