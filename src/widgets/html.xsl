<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "../entities.dtd">
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
	<xsl:template match="/">
		<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
		<html>
			<xsl:attribute name="lang">
				<xsl:value-of select="/locale/@lang" />
			</xsl:attribute>
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<title>
					<xsl:value-of select="/locale/page-title" />
				</title>
				<link rel="shortcut icon" href="../assets/images/favicon.png" />
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1" />
				<link rel="stylesheet" type="text/css" href="../assets/styles/main.css" />
			</head>
			<body>
				<xsl:apply-templates select="locale" />
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
