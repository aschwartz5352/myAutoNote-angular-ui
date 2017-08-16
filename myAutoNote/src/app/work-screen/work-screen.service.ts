import {Injectable} from '@angular/core';

@Injectable()
export class WorkScreenService{

  constructor(){}

  public parseText(content:string, index:number){
    let data = {
      raw:content,
      content:content.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
          words:content.split(" "),
          lineNumber:0,
          vocab:-1,
          bulletPointLevel:0,
          url:[],
          headerSize:0,
          margin:0,
          tableColumn:-1,
          table:{},
          underline:[],
          bold:[],
          italic:[]};
            data.lineNumber = index;
    data = this.isHeader(data);
    data = this.isTitle(data);

    return this.print(data);
  }

  //counts the number of trailing tildas to determine the size of the header (1=large, 6=small)
  public isHeader(data:any){
  	var headerSize = 0;
  	data.headerSize = 0;
  	var i = data.content.length-1;
  	while(data.content.charAt(i) == '`'){
  		headerSize++;
  		i--;
  	}
  	data.content = data.content.substring(0, data.content.length-headerSize);
  	if(headerSize > 6)
  		headerSize =  6;
  	data.headerSize = headerSize;
    return data;
  }

  public isTitle(data){
	if(data.headerSize == 0 && data.vocab == -1){
		var content = data.content;
		var words = content.split(" ");
		var score = 0;
		for(var i = 0; i < words.length; i++){
			if(words[i].length > 0)
				score = (this.isWordUperCase(words[i])|| this.containsIntegers(words[i]) ? score+1 : score);
		}
		if(score/words.length >= 0.6){
			data.headerSize = 2;
		}

    return data;
	}
}

public isWordUperCase(input){
	if(input.charCodeAt(0) >= 65 && input.charCodeAt(0) <=  90)
		return true;
	else
		return false;
}

public containsIntegers(input){
	if(input.charCodeAt(0) >= 48 && input.charCodeAt(0) <=  57)
		return true;
	else
		return false;
}

public print(data){
	var tagTypes = [ "p", "h1", "h2", "h3", "h4", "h5", "h6" ];
	var fontSizeTypes = [ "20", "35", "26", "22", "18", "18", "18" ];
	var html = "";


		var openTag = tagTypes[data.headerSize];
		var color = '#444444';
		var opacity = 1;

		if(data.content.trim().length == 0){
			html += "<p><br></p>";
		}else{
			if(data.headerSize > 0){
				color = "#f00";
				opacity = 1-(0.1)*data.headerSize;
			}
			var closeTag = openTag;



			if(data.bulletPointLevel > 0){
				//data.margin += (25)*(data.bulletPointLevel);
				var type = "disk";
				if(data.bulletPointLevel%3 == 1){
					type = "disk";
				}else if(data.bulletPointLevel%3 == 2){
					type = "circle";
				}else{
					type = "square";
				}

				if(openTag == "p"){
					html += "<ul><li class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" style=\"list-style-type:" + type+";";
					closeTag = "li></ul";
				}else{
					//html += "<ul><li style=\"list-style-type:" + type+";\">";
					//html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" ";
					html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" ";
					html += ">" + "<ul><li style=\"list-style-type:" + type+";font-size:"+fontSizeTypes[data.headerSize] + "px;";
					closeTag = "li><ul></"+closeTag;
					//closeTag = "</" + closeTag + "></li></ul";
				}
			}else{
				html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" " + " style=\"";
			}

			html += "color:"+color+";opacity:"+opacity + ";margin-left:"+(data.margin+(25*(data.bulletPointLevel)))+"px;\">";

			//var html = "<" + openTag + "color:"+color+";opacity:"+opacity + ";margin-left:"+data.margin+"px;\" class=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\"" + ">";




			var content = data.content;

			var mark = 0;
			var right = data.content;
			if(data.vocab > 0){
				var left = data.content.substring(0, data.vocab).replace(/ /g, "&nbsp;&nbsp;");
				right = data.content.substring(data.vocab+1);

				html += "<b>" + left + "</b> " + data.content.substring(data.vocab, data.vocab+1).replace(/  /g, "&nbsp;&nbsp;") + " ";
				//mark = left.length;
			}

			if(data.url.length > 0){
				for(var i = 0; i < data.url.length-1; i+=2){
					if(data.url[i] > data.vocab){
						html += right.substring(mark, data.url[i]).replace(/  /g, "&nbsp;&nbsp;") + "<ins \"onclick=\"urlclick(this)\">" + right.substring(data.url[i], data.url[i+1]) + "</ins>";
						mark = data.url[i+1];
					}
				}
				html += right.substring(mark);
			}else
				html += right.replace(/  /g, "&nbsp;&nbsp;");



			html += "</" + closeTag + ">";
		}

	return html;

}


}
