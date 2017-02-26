<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "../entities.dtd">
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
	<xsl:template match="locale">
		<div class="banner">
			<a target="_blank">
				<xsl:attribute name="no-href">
					<xsl:value-of select="/locale/app-link" />
				</xsl:attribute>
				<i class="app-icon app-icon--shadow"></i>
			</a>
		</div>
		<div class="content">
			<h1 class="content-title">
				<xsl:apply-templates select="title" mode="content" />
			</h1>
			<p class="content-text">
				<xsl:apply-templates select="description" mode="content" />
			</p>
			<p class="content-text">
				<xsl:apply-templates select="footer" mode="content" />
			</p>
		</div>
	</xsl:template>
</xsl:stylesheet>
