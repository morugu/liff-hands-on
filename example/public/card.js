$(document).ready(function() {
	var liffAppId = '1653289441-4zeVlKkV';
	var userId = '';
	liff.init(
		{
			liffId: liffAppId,
		},
		function(data) {
			console.log('liff.init 完了');
			console.log(liff.getOS());
			if (liff.isLoggedIn()) {
				liff.getProfile()
					.then(function(userData) {
						console.log(`liff.getProfile 完了 userId: ${userData.userId}, displayName: ${userData.displayName}`);
						userId = userData.userId;
						$('#name').text(userData.displayName + ' 様');
						// $('#point').text('100 ポイント');
						$.get('/point/' + userData.userId, function(data, status) {
							$('#point').text(data.point + ' ポイント');
						});
						$('#profile-image').attr('src', userData.pictureUrl);
						$('#profile-image').show();
					})
					.catch(function(err) {
						console.log(`liff.getProfile 失敗 code: ${err.code}, detail: ${err.message}`);
					});
			} else {
				liff.login();
			}
		},
		function(err) {
			console.log(`liff.init 失敗 ${err}`);
		}
	);

	$('#qr-button').click(function() {
		liff.scanCode().then(function(result) {
			$.post(result.value, { userId: userId }, function(data) {
				if (data.error) {
					alert(data.error);
					return;
				}
				alert(data.addPoint + ' ポイントを獲得しました！');
				$('#point').text(data.currentPoint + data.addPoint + ' ポイント');
			}).catch(function(err) {
				console.log(err);
			});
		});
	});
});
