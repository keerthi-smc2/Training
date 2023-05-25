'use strict';

module.exports = {
    feedback: function() {
        console.log("data")
        $('form.demo').submit((e)=>{
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            $('form.demo').trigger('feedback:submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: (data)=>{
                    console.log(data);
                    $('form.demo').trigger('feedback:success', data);
                        location.href = data.redirectUrl;
                }
            });
        });
    }
}