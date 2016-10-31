/* Image w/ description tooltip v2.0
* Created: April 23rd, 2010. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/


var ddimgtooltip={

	tiparray:function(){
		var tooltips=[]
		//define each tooltip below: tooltip[inc]=['path_to_image', 'optional desc', optional_CSS_object]
		//For desc parameter, backslash any special characters inside your text such as apotrophes ('). Example: "I\'m the king of the world"
		//For CSS object, follow the syntax: {property1:"cssvalue1", property2:"cssvalue2", etc}

		tooltips[0]=["img/spaceball.png", "<b>Lauryn aka 'Nneg Nneg'</b><br/<br/>A 1.5kg Chihuahua bitch whelped on 27th Oct 2001.<br/><br/>The most timid, oldest & smallest, but armed with the loudest & longest barks amongst them 3. <br/><br/>Living a life very similar to a ninja - making an appearance only when deemed fit & that is, when there’s FOOD!", {background:"#89a157", color:"#fff", width:"300px", font:"11px Arial"}]
		tooltips[1]=["img/spaceball.png", "<b>Velvet aka 'Birdee'</b><br/<br/>A dark salt/pepper 5.4kg Miniature Schnauzer bitch whelped on 28th March 2005.<br/><br/>She’s hand-stripped & groomed by me since young.<br/><br/>Velvet has always been an Alpha Bitch (a natural self-assured & confident leader) amongst all dogs & has a high level of tolerance towards Cotton’s silly antics everyday.<br/><br/>If you’re wondering about her nick, yes she loves birds a whole lot & her best friend’s our late-lovebird, Sunset.", {background:"#89a157", color:"#fff", width:"300px", font:"11px Arial"}]
		tooltips[2]=["img/spaceball.png", "<b>Cotton aka 'Durn Durn'</b><br/<br/>A 4.8kg Bichon Frise bitch whelped on 18th Feb 2006.<br/><br/>Being born with a slight Entropion eye condition, she tears all the time & thus, leading to dis-coloured fur around her face.<br/><br/>Not the friendliest bitch to most strangers, but definitely cute & fun-loving towards all whom know her on a personal level (& of course, she has to like you!)… & did I mention that she loves to “break dance”?", {background:"#89a157", color:"#fff", width:"300px", font:"11px Arial"}]
		tooltips[3]=["img/spaceball.png", "<p><strong>Chewy aka 'Wee Wee'</strong></p><p>A 3.2kg Domestic Short Hair Calico Cat whelped on 17th June 2010 (estimated date of birth).</p><br /><p>She came runnin' out from under our car one night on 10th Nov. 2010 & we brought her back with the intention of findin' her a good home. Surprisingly, it was as if she knew the 3 pups forever when they met & she immediately took a likin' to them & vice-versa! We interviewed a few potential adopters but none of them worked out & so fate has it that Chewy's here to stay.</p><br /><p>Since we couldn't find any other kittens of her age or color around the area, we suspect she's of an ''advanced alien race from another universe sent to infiltrate Earth by assumin' the form of a cute kitty cat simply to observe the relationship between humans & their animals''.</p>", {background:"#89a157", color:"#fff", width:"300px", font:"11px Arial"}]
		return tooltips //do not remove/change this line
	}(),

	tooltipoffsets: [20, -50], //additional x and y offset from mouse cursor for tooltips

	//***** NO NEED TO EDIT BEYOND HERE

	tipprefix: 'imgtip', //tooltip ID prefixes

	createtip:function($, tipid, tipinfo){
		if ($('#'+tipid).length==0){ //if this tooltip doesn't exist yet
			return $('<div id="' + tipid + '" class="ddimgtooltip" />').html(
				'<div style="text-align:center"><img src="' + tipinfo[0] + '" /></div>'
				+ ((tipinfo[1])? '<div style="text-align:left; margin-top:0px">'+tipinfo[1]+'</div>' : '')
				)
			.css(tipinfo[2] || {})
			.appendTo(document.body)
		}
		return null
	},

	positiontooltip:function($, $tooltip, e){
		var x=e.pageX+this.tooltipoffsets[0], y=e.pageY+this.tooltipoffsets[1]
		var tipw=$tooltip.outerWidth(), tiph=$tooltip.outerHeight(), 
		x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(ddimgtooltip.tooltipoffsets[0]*2) : x
		y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
		$tooltip.css({left:x, top:y})
	},
	
	showbox:function($, $tooltip, e){
		$tooltip.show()
		this.positiontooltip($, $tooltip, e)
	},

	hidebox:function($, $tooltip){
		$tooltip.hide()
	},


	init:function(targetselector){
		jQuery(document).ready(function($){
			var tiparray=ddimgtooltip.tiparray
			var $targets=$(targetselector)
			if ($targets.length==0)
				return
			var tipids=[]
			$targets.each(function(){
				var $target=$(this)
				$target.attr('rel').match(/\[(\d+)\]/) //match d of attribute rel="imgtip[d]"
				var tipsuffix=parseInt(RegExp.$1) //get d as integer
				var tipid=this._tipid=ddimgtooltip.tipprefix+tipsuffix //construct this tip's ID value and remember it
				var $tooltip=ddimgtooltip.createtip($, tipid, tiparray[tipsuffix])
				$target.mouseenter(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.showbox($, $tooltip, e)
				})
				$target.mouseleave(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.hidebox($, $tooltip)
				})
				$target.mousemove(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.positiontooltip($, $tooltip, e)
				})
				if ($tooltip){ //add mouseenter to this tooltip (only if event hasn't already been added)
					$tooltip.mouseenter(function(){
						ddimgtooltip.hidebox($, $(this))
					})
				}
			})

		}) //end dom ready
	}
}

//ddimgtooltip.init("targetElementSelector")
ddimgtooltip.init("*[rel^=imgtip]")