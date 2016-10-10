from django import template

register = template.Library()

@register.filter(name='addclass')
def addclass(value, arg):
	return value.as_widget(attrs={'class': arg})

@register.filter(name='concat')
def concat(value, arg):
	return value + str(arg)

@register.filter(name='addattrs')
def addattrs(value, args):

	if args is None:
		return False

	arg_dict = {}
	arg_list = args.split(',')
	
	for i in range(0, len(arg_list), 2):
		arg_dict[arg_list[i]] = arg_list[i+1]

	return value.as_widget(attrs=arg_dict)