(function($) {
	$.fn.easymenu = function(options) {
		var default_options = {
			'hover_class' : 'hover',	// 榧犳爣杩涜繃鑿滃崟椤规椂鐨刢lass
			'main_item_class' : 'main-item',	// 涓昏彍鍗曢」鐨刢lass
			'sub_item_class' : 'sub-item',	// 瀛愯彍鍗曢」鐨刢lass
			'separator_class' : 'separator',	// 鍒嗛殧绗︾殑class
			'has_child_class' : 'has-child'	// 鍚湁瀛愯彍鍗曟椂鐨刢lass
		};
		options = $.extend(default_options, options);

		this.each(function(i, item) {
			
			// 鍖哄垎涓昏彍鍗曢」鍜屽瓙鑿滃崟椤�
			$(item).children('li').addClass(options.main_item_class).find('li').addClass(options.sub_item_class);
			
			$(item)
			// 鍒ゆ柇瀛愯彍鍗曢」绫诲瀷
			.find('li').each(function(j, li) {
				// 缁欑┖鐨勮彍鍗曢」娣诲姞separator绫�
				if ($(li).html() == '') $(li).removeClass().addClass(options.separator_class);
				// 濡傛灉鏈夊瓙鑿滃崟锛屽垯娣诲姞has_child绫�
				if ($(li).children('ul').length > 0) $(li).addClass(options.has_child_class);
			})

			// 鑿滃崟浜嬩欢澶勭悊
			.hover(function() {
				// 涓嶆槸鍒嗛殧绗﹀垯娣诲姞hover绫�
				if (!$(this).hasClass(options.separator_class)) $(this).addClass(options.hover_class);

				// 鏈夊瓙鑿滃崟锛屽垯鏄剧ず
				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					var is_first_submenu = $(this).hasClass(options.main_item_class);
					var p_pos = $(this).position();				// 褰撳墠鑿滃崟椤逛綅缃�
					var p_w = parseInt($(this).outerWidth());	// 褰撳墠鑿滃崟椤瑰
					var p_h = parseInt($(this).outerHeight());	// 褰撳墠鑿滃崟椤归珮
					var w = parseInt(submenu.outerWidth());		// 褰撳墠瀛愯彍鍗曞
					var h = parseInt(submenu.outerHeight());	// 褰撳墠瀛愯彍鍗曢珮

					// 鍖哄垎澶勭悊涓€绾у瓙鑿滃崟鐨勪綅缃�
					var css = {};
					var p_offset = $(this).offset();	// 褰撳墠鑿滃崟鐨勪綅缃�
					if (is_first_submenu) {
						css.left = parseInt(p_pos.left);
						css.top = parseInt(p_pos.top) + p_h;
						// 濡傛灉瓒呭嚭灞忓箷锛屽垯灏嗕竴绾у瓙鑿滃崟鐨刲eft-褰撳墠瀛愯彍鍗曞+褰撳墠鑿滃崟椤瑰+1
						if ((p_offset.left + w) > $(document).width()) css.left = css.left - w + p_w + 1;
					} else {
						css.left = parseInt(p_pos.left) + p_w - 1;
						css.top = parseInt(p_pos.top);
						// 濡傛灉瓒呭嚭灞忓箷锛屽垯灏嗗瓙鑿滃崟鐨刲eft-褰撳墠瀛愯彍鍗曞-褰撳墠鑿滃崟椤瑰+1
						if ((p_offset.left + p_w + w) > $(document).width()) css.left = css.left - w - p_w + 1;
					}

					// 鏄剧ず瀛愯彍鍗�
					submenu.css(css).show();
				}
			}, function() {
				// 涓嶆槸鍒嗛殧绗﹀垯绉婚櫎hover绫�
				if (!$(this).hasClass(options.separator_class)) $(this).removeClass(options.hover_class);

				// 鏈夊瓙鑿滃崟锛屽垯闅愯棌
				if ($(this).hasClass(options.has_child_class)) {
					var submenu = $(this).children('ul');
					submenu.hide();
				}
			});
		});
	}
})(jQuery);