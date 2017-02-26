<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "../entities.dtd">
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
	<xsl:template match="*" mode="content">
		<xsl:apply-templates select="* | text()" />
	</xsl:template>

	<xsl:template match="*">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="@* | * | text()" />
		</xsl:element>
	</xsl:template>

	<xsl:template match="@* | text()">
		<xsl:copy-of select="." />
	</xsl:template>
</xsl:stylesheet>
